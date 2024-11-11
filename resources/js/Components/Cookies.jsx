// https://www.npmjs.com/package/react-cookie-consent
import CookieConsent from "react-cookie-consent";

export default function Cookies({t}){

    return (
        <CookieConsent
            location="bottom"
            buttonText={t('Cookies.button-accept')}
            cookieName="cookies-accept"
            style={{ background: "#000000", textAlign: 'center' }}
            containerClasses="cookies-consent"
            buttonClasses="cookies-button"
            /*
            buttonStyle={{ 
                borderRadius: '5px', 
                background: "#FF8C00", 
                color: '#FFFFFF', 
                fontSize: "14px" 
            }}
            expires={150}
            onAccept={(acceptedByScrolling) => {
                if (acceptedByScrolling) {
                    // triggered if user scrolls past threshold
                    alert("Accept was triggered by user scrolling");
                }
                else {
                alert("Accept was triggered by clicking the Accept button");
                }
            }}
            enableDeclineButton
                onDecline={() => {
                    alert("nay!");
            }}
            buttonClasses="btn btn-primary"
            containerClasses="alert alert-warning col-lg-12"
            */
        >
            {t('Cookies.message')}
        </CookieConsent>
    )
}