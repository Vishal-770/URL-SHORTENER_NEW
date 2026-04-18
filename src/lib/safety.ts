/**
 * Google Safe Browsing Integration
 * 
 * Provides server-side validation to protect against:
 * - Malware
 * - Social Engineering (Phishing)
 * - Deceptive Sites
 */

interface SafeBrowsingResult {
  isSafe: boolean;
  threatType?: string;
}

export async function checkUrlSafety(url: string): Promise<SafeBrowsingResult> {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  
  if (!apiKey) {
    console.warn("GOOGLE_SAFE_BROWSING_API_KEY is not defined. Skipping safety check.");
    return { isSafe: true };
  }

  const apiEndpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const payload = {
    client: {
      clientId: "linklayer-url-shortener",
      clientVersion: "1.0.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
       console.error("Safe Browsing API error:", await response.text());
       // If API fails, we fail open or closed? Usually fail open for UX, 
       // but for high security we can log it.
       return { isSafe: true }; 
    }

    const data = await response.json();

    // If matches array exists and is not empty, it is unsafe
    if (data.matches && data.matches.length > 0) {
      return {
        isSafe: false,
        threatType: data.matches[0].threatType
      };
    }

    return { isSafe: true };
  } catch (error) {
    console.error("Safety check failed to execute:", error);
    return { isSafe: true }; // Fallback to safe if infrastructure fails
  }
}
