import {FormattedMessage} from "react-intl";

const Footer = () => {

    return (
        <div>
            <br/>
            <hr/>
            <footer>
                <p className="text-center">
                    <FormattedMessage id="project.app.Footer.text"/>
                </p>
            </footer>
        </div>
    )

}

export default Footer;