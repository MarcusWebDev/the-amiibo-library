import React from "react";
import "./TermsOfServiceAndPrivacy.css";

const TermsOfServiceAndPrivacy = ({}) => {
    return (
        <div className="TOSAPContainer">
            <h1 className="TOSAPHeader">Terms of Service / Privacy Policy</h1>
            <p>By using this site you agree that you won't use it to hurt people or damage property, you're 13 years of age or older, and any information you share through the site is at your own risk. You also acknowledge that this is an unofficial, fan-made site and has no affiliation with Nintendo, Activision, or any other companies whose products and intellectual property are depicted here.</p>
            <p>amiibo life respects your privacy. It makes efforts to collect only the info it needs to work, such as your email address and a username you provide if you choose to sign up, as well as anonymized usage information (gathered with Plausible Analytics) so we can better understand how the site is used. This site uses cookies only for your convenience to remember that you've logged in when you return using the same browser.</p>
        </div>
    );
}

export default TermsOfServiceAndPrivacy;