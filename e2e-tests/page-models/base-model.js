import ReactSelector from "testcafe-react-selectors";
import { Selector } from "testcafe";

export default class BasePage {
  constructor() {
    // Top bar
    this.linkFabric = ReactSelector("BrandText");
    this.linkBreadcrumbs = ReactSelector("Breadcrumb"); // returns all Breadcrumb instances
    this.linkLanguages = ReactSelector("LanguageSelectorWrap");
    this.linkVersion = ReactSelector("AppVersionLink");
    this.linkSettings = Selector("a").withAttribute("title", "Settings");

    // Banner
    this.pageTitle = ReactSelector("Header");

    // Footer bar
    this.linkDecipher = ReactSelector("LongLogo");
    this.linkGitHub = ReactSelector("Links Link").withAttribute(
      "href",
      "http://github.com/DecipherNow"
    );
    this.linkTwitter = ReactSelector("Links Link").withAttribute(
      "href",
      "http://twitter.com/deciphernow"
    );
    this.linkLinkedIn = ReactSelector("Links Link").withAttribute(
      "href",
      "http://www.linkedin.com/company/decipher-technology-studios"
    );
  }
}
