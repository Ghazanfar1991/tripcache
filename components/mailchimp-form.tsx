"use client"

import { useEffect } from "react"

export function MailchimpForm() {
  useEffect(() => {
    // Load Mailchimp validation script
    const script = document.createElement("script")
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Initialize Mailchimp validation
      const initScript = document.createElement("script")
      initScript.innerHTML = `
        (function($) {
          window.fnames = new Array(); 
          window.ftypes = new Array();
          fnames[0]='EMAIL';
          ftypes[0]='email';
        }(jQuery));
        var $mcj = jQuery.noConflict(true);
      `
      document.body.appendChild(initScript)
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div id="mc_embed_shell" className="w-full max-w-md mx-auto">
      <style jsx>{`
        #mc_embed_signup {
          background: transparent;
          clear: left;
          width: 100%;
        }
        #mc_embed_signup form {
          padding: 0;
        }
        #mc_embed_signup h2 {
          font-size: 1.5rem;
          font-weight: 650;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          color: #29251f;
        }
        #mc_embed_signup .mc-field-group {
          margin-bottom: 1rem;
          width: 100%;
        }
        #mc_embed_signup label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #514a42;
        }
        #mc_embed_signup input[type="email"] {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(58, 48, 38, 0.14);
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.58);
          color: #29251f;
          font-size: 1rem;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 8px 24px rgba(72, 53, 33, 0.05);
          transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
        }
        :global(.dark) #mc_embed_signup input[type="email"] {
          background: rgba(255, 255, 255, 0.58);
          border-color: rgba(58, 48, 38, 0.14);
          color: #29251f;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 8px 24px rgba(72, 53, 33, 0.05);
        }
        #mc_embed_signup input[type="email"]:focus {
          outline: 2px solid #db6947;
          outline-offset: 2px;
          border-color: rgba(219, 105, 71, 0.5);
          background: rgba(255, 255, 255, 0.84);
        }
        #mc_embed_signup .button {
          width: 100%;
          padding: 0.75rem 2rem;
          background: #b9543a;
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(145, 60, 38, 0.22);
          transition: transform 150ms ease, background-color 150ms ease;
        }
        #mc_embed_signup .button:hover {
          background: #a44833;
        }
        #mc_embed_signup .button:active {
          transform: scale(0.965);
        }
        #mc_embed_signup .indicates-required {
          font-size: 0.75rem;
          color: #71695f;
          margin-bottom: 1rem;
        }
        #mc_embed_signup .asterisk {
          color: #be123c;
        }
        #mc_embed_signup .clear.foot {
          margin-top: 1rem;
        }
        #mc_embed_signup .optionalParent p {
          display: none;
        }
        #mce-responses {
          margin-top: 1rem;
        }
        #mce-responses .response {
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        #mce-error-response {
          background: rgba(190, 18, 60, 0.08);
          color: #9f1239;
        }
        #mce-success-response {
          background: rgba(4, 120, 87, 0.08);
          color: #047857;
        }
      `}</style>

      <div id="mc_embed_signup">
        <form
          action="https://gmail.us6.list-manage.com/subscribe/post?u=1cef3766ef227139e3c699e85&amp;id=536a3e4923&amp;f_id=008583e5f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2>Join the Waitlist</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> indicates required
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">
                Email Address <span className="asterisk">*</span>
              </label>
              <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required />
            </div>
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
              <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
            </div>
            <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
              <input type="text" name="b_1cef3766ef227139e3c699e85_536a3e4923" tabIndex={-1} />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
