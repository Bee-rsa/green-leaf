const express = require("express");
const { Resend } = require("resend");

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const emailSubject =
      subject?.trim() || "New Green Leaf Contact Enquiry";

    const { data, error } = await resend.emails.send({
      from: "Green Leaf Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,

      subject: `Green Leaf Enquiry: ${emailSubject}`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Green Leaf Contact Enquiry</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f7f5f0;
              font-family: Arial, sans-serif;
              color: #222222;
            "
          >
            <div
              style="
                max-width: 650px;
                margin: 40px auto;
                background: #ffffff;
                border: 1px solid #e5e5e5;
              "
            >

              <div
                style="
                  padding: 30px;
                  background-color: #879b86;
                  color: #ffffff;
                "
              >
                <h1
                  style="
                    margin: 0;
                    font-size: 26px;
                    font-weight: 400;
                  "
                >
                  Green Leaf
                </h1>

                <p
                  style="
                    margin: 8px 0 0;
                    font-size: 14px;
                  "
                >
                  New Website Enquiry
                </p>
              </div>

              <div style="padding: 30px;">

                <h2
                  style="
                    margin-top: 0;
                    font-size: 20px;
                    font-weight: 400;
                  "
                >
                  Contact Details
                </h2>

                <p>
                  <strong>Name:</strong><br />
                  ${name}
                </p>

                <p>
                  <strong>Email:</strong><br />
                  ${email}
                </p>

                <p>
                  <strong>Phone:</strong><br />
                  ${phone || "Not provided"}
                </p>

                <p>
                  <strong>Subject:</strong><br />
                  ${emailSubject}
                </p>

                <hr
                  style="
                    border: none;
                    border-top: 1px solid #eeeeee;
                    margin: 25px 0;
                  "
                />

                <h2
                  style="
                    font-size: 20px;
                    font-weight: 400;
                  "
                >
                  Message
                </h2>

                <p
                  style="
                    white-space: pre-line;
                    line-height: 1.7;
                    color: #444444;
                  "
                >
                  ${message}
                </p>

              </div>

              <div
                style="
                  padding: 20px 30px;
                  background-color: #f7f5f0;
                  font-size: 12px;
                  color: #777777;
                "
              >
                This enquiry was submitted through the Green Leaf website.
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        message: "Unable to send your message right now.",
      });
    }

    return res.status(200).json({
      message: "Your message has been sent successfully.",
      id: data?.id,
    });

  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      message: "Something went wrong while sending your message.",
    });
  }
});

module.exports = router;