export async function onRequestPost({ request, env }) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const mailerLiteApiKey = env.MAILERLITE_API_KEY;

    if (!mailerLiteApiKey) {
      console.error('MailerLite API key is not configured.');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${mailerLiteApiKey}`,
      },
      body: JSON.stringify({
        email: email,
        // Optional: you can add them to a specific group by adding `groups: ['GROUP_ID']` here
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('MailerLite API error:', errorData);
        return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ success: true, message: 'Successfully subscribed' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
