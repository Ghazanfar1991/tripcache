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
          font-weight: 700;
          margin-bottom: 1rem;
          color: inherit;
        }
        #mc_embed_signup .mc-field-group {
          margin-bottom: 1rem;
          width: 100%;
        }
        #mc_embed_signup label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: inherit;
        }
        #mc_embed_signup input[type="email"] {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid hsl(var(--border));
          border-radius: 9999px;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-size: 1rem;
          box-shadow: 0 0 0 1px hsl(var(--border) / 0.3);
        }
        :global(.dark) #mc_embed_signup input[type="email"] {
          background: hsl(var(--background) / 0.9);
          border-color: hsl(var(--border));
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        #mc_embed_signup input[type="email"]:focus {
          outline: 2px solid hsl(var(--ring));
          outline-offset: 2px;
          box-shadow: 0 0 0 1px hsl(var(--ring));
        }
        #mc_embed_signup .button {
          width: 100%;
          padding: 0.75rem 2rem;
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
          border: none;
          border-radius: 9999px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        #mc_embed_signup .button:hover {
          background: hsl(var(--accent) / 0.9);
          transform: scale(1.02);
        }
        #mc_embed_signup .indicates-required {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
          margin-bottom: 1rem;
        }
        #mc_embed_signup .asterisk {
          color: hsl(var(--destructive));
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
          background: hsl(var(--destructive) / 0.1);
          color: hsl(var(--destructive));
        }
        #mce-success-response {
          background: hsl(var(--accent) / 0.1);
          color: hsl(var(--accent));
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
