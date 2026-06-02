export async function sendSlackMessage(
  message: string
) {
  const webhookUrl =
    process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error(
      "SLACK_WEBHOOK_URL is missing"
    );
  }

  const response = await fetch(
    webhookUrl,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to send Slack message"
    );
  }
}