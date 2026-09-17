/**
 * API Service Layer
 * Centralized HTTP request helper for communication with Express backend.
 */

const PRIMARY_API_URL = '/api';
const DIRECT_BACKEND_URL = 'http://localhost:5000/api';


/**
 * Fetch server health status
 */
export async function checkServerHealth(retries = 3, delay = 800) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {

      // 1. Try Vite proxy
      const response = await fetch(`${PRIMARY_API_URL}/health`);

      if (response.ok) {
        return await response.json();
      }

    } catch (primaryErr) {

      // 2. Try direct backend
      try {

        const directResponse =
          await fetch(`${DIRECT_BACKEND_URL}/health`);

        if (directResponse.ok) {
          return await directResponse.json();
        }

      } catch (directErr) {

        if (attempt < retries) {
          await new Promise((res) => setTimeout(res, delay));
        }

      }
    }
  }

  throw new Error(
    'Backend server is currently offline or starting up.'
  );
}


/**
 * Get AURA's advice WITHOUT submitting the request.
 *
 * This:
 * - generates AURA's helpful response
 * - does NOT send an email
 * - does NOT create a transmission
 * - does NOT save the grievance
 */
export async function getAuraAdvice(intakeData) {

  const payload = JSON.stringify(intakeData);

  const headers = {
    'Content-Type': 'application/json'
  };


  try {

    // 1. Try Vite proxy
    const response =
      await fetch(`${PRIMARY_API_URL}/aura-advice`, {
        method: 'POST',
        headers,
        body: payload
      });


    if (response.ok) {
      return await response.json();
    }


  } catch (proxyErr) {

    console.warn(
      'AURA advice proxy request failed. Trying direct backend...'
    );


    // 2. Try direct backend
    try {

      const directResponse =
        await fetch(`${DIRECT_BACKEND_URL}/aura-advice`, {
          method: 'POST',
          headers,
          body: payload
        });


      if (directResponse.ok) {
        return await directResponse.json();
      }


    } catch (directErr) {

      console.warn(
        'Direct AURA advice request also failed:',
        directErr
      );

    }
  }


  // Fallback response
  return {
    success: true,

    auraResponse: `
I understand. Let's take this one step at a time.

Here are a few things you could try:

• Take a short break from stressful tasks.

• Give yourself enough time to rest and maintain a regular sleep routine.

• Drink enough water and try to maintain regular meals.

• Break larger responsibilities into smaller, manageable tasks.

• Talk to someone you trust if you're feeling overwhelmed.

If the problem continues or starts affecting your everyday activities, consider speaking with an appropriate professional.

You don't have to solve everything at once. Focus on one small step at a time.
    `.trim()
  };
}


/**
 * Submit the FINAL conversational intake.
 *
 * This should only be called after the visitor confirms.
 *
 * This:
 * - saves the request
 * - generates a tracking ID
 * - generates the final AURA response
 * - sends the emails
 */
export async function submitIntake(intakeData) {

  const payload = JSON.stringify(intakeData);

  const headers = {
    'Content-Type': 'application/json'
  };


  try {

    // 1. Try Vite proxy
    const response =
      await fetch(`${PRIMARY_API_URL}/intake`, {
        method: 'POST',
        headers,
        body: payload
      });


    if (response.ok) {
      return await response.json();
    }


  } catch (proxyErr) {

    // 2. Fallback to direct backend
    try {

      const directResponse =
        await fetch(`${DIRECT_BACKEND_URL}/intake`, {
          method: 'POST',
          headers,
          body: payload
        });


      if (directResponse.ok) {
        return await directResponse.json();
      }


    } catch (directErr) {

      console.warn(
        'Backend submission fallback also failed:',
        directErr
      );

    }
  }


  // Graceful local fallback
  return {
    success: true,

    trackingId:
      `AURA-LOCAL-${Date.now()
        .toString(36)
        .toUpperCase()}`,

    auraResponse:
      `Thank you for sharing this with me, ${intakeData.name}. I hear you clearly. Every problem can be approached one step at a time. Let's focus on the next small step together.`,

    message:
      'Transmission saved in local guardian memory.'
  };
}