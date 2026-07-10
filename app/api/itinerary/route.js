// app/api/itinerary/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { destination, days, budget, vibe } = await request.json();
    const targetCity = destination ? destination.trim() : "Jaipur";
    const totalDays = Number(days) || 3;
    const totalBudget = Number(budget) || 45000;
    const averageCost = Math.floor(totalBudget / totalDays);

    // ==========================================
    // 1. Wikipedia Summary (Destination-aware)
    // ==========================================
    let wikiSummary = `A luxurious journey through the historic heart of ${targetCity}.`;
    try {
      const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        targetCity
      )}`;
      const wikiRes = await fetch(wikiUrl, {
        headers: { "User-Agent": "ItinerianApp/1.0" },
      });
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData.extract) {
          wikiSummary = wikiData.extract.split(".").slice(0, 3).join(".") + ".";
        }
      }
    } catch (e) {
      console.log("Wikipedia fallback used");
    }

    // ==========================================
    // 2. Dynamic Hero Image (City-specific)
    // ==========================================
    const heroImages = {
      jaipur:
        "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1600&q=80",
      delhi:
        "https://images.unsplash.com/photo-1587474260584-1363a6a2c2c3?auto=format&fit=crop&w=1600&q=80",
      agra: "https://images.unsplash.com/photo-1548013146-8a3c8b9c2c4e?auto=format&fit=crop&w=1600&q=80",
      mumbai:
        "https://images.unsplash.com/photo-1566552881560-8c9c8b4c2b5e?auto=format&fit=crop&w=1600&q=80",
      kyoto:
        "https://images.unsplash.com/photo-1493976040374-85c8e8f0e7c7?auto=format&fit=crop&w=1600&q=80",
      rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
      paris:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    };

    const cityLower = targetCity.toLowerCase();
    const hero_image =
      heroImages[cityLower] ||
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80";

    // ==========================================
    // 3. Enhanced City-Specific Logic
    // ==========================================
    const cityData = {
      jaipur: { type: "royal", region: "Rajasthan" },
      delhi: { type: "historical", region: "North India" },
      agra: { type: "monumental", region: "Uttar Pradesh" },
      mumbai: { type: "coastal", region: "Maharashtra" },
      kyoto: { type: "cultural", region: "Japan" },
      rome: { type: "ancient", region: "Italy" },
      paris: { type: "romantic", region: "France" },
    };

    const data = cityData[cityLower] || { type: "cultural", region: "World" };

    // More varied templates
    const morningActivities =
      data.type === "royal"
        ? [
            `Dawn visit to the majestic Amber Fort`,
            `Private sunrise tour of City Palace`,
            `Heritage walk through Pink City gates`,
          ]
        : data.type === "ancient"
        ? [
            `Early morning Colosseum exploration`,
            `Vatican Museums private tour`,
          ]
        : [
            `Morning temple or palace visit`,
            `Cultural heritage site exploration`,
          ];

    const landmarks = {
      jaipur: ["Amber Fort", "Hawa Mahal", "Jantar Mantar", "City Palace"],
      delhi: ["Red Fort", "Qutub Minar", "Humayun's Tomb", "India Gate"],
      agra: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
      // ... add more as needed
    };

    const cityLandmarks = landmarks[cityLower] || [
      `${targetCity} Heritage Site`,
      "Historic Quarter",
      "Cultural Plaza",
    ];

    // ==========================================
    // 4. Generate Days (Much more dynamic now)
    // ==========================================
    const generatedDays = Array.from({ length: totalDays }, (_, i) => {
      const dayNum = i + 1;
      const landmark = cityLandmarks[i % cityLandmarks.length];

      return {
        day: dayNum,
        title: `${targetCity} Day ${dayNum}: ${
          data.type === "royal" ? "Royal Heritage" : "Cultural Immersion"
        }`,
        theme: vibe || "Royal & Regal",
        day_total_inr: averageCost,
        morning: {
          time: "09:00 AM",
          activity:
            morningActivities[i % morningActivities.length] ||
            `Morning exploration of ${landmark}`,
          landmark: landmark,
          cost_inr: Math.floor(averageCost * 0.35),
        },
        afternoon: {
          time: "02:00 PM",
          activity: `Immersive walk through the vibrant bazaars and artisanal workshops of ${targetCity}`,
          landmark: `Old City Bazaar, ${targetCity}`,
          cost_inr: Math.floor(averageCost * 0.25),
        },
        evening: {
          time: "06:30 PM",
          activity: `Sunset experience at ${landmark} with traditional cultural performance`,
          landmark: landmark,
          cost_inr: Math.floor(averageCost * 0.4),
        },
        meals: {
          lunch: `Signature ${data.region} Thali / Cuisine`,
          dinner: `Rooftop fine dining with ${targetCity} skyline`,
        },
        backup_activity: {
          title: "Cultural Sanctuary Retreat",
          description: `Private museum or palace library experience inside ${targetCity}'s most treasured heritage site.`,
          cost_inr: Math.floor(averageCost * 0.3),
        },
      };
    });

    return NextResponse.json({
      destination: targetCity,
      style: data.type,
      hero_image,
      summary: wikiSummary,
      total_estimated_cost: totalBudget,
      days: generatedDays,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
