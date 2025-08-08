import Welcome from "./componets/Welcome";
import TeamSection from "./componets/TeamSection";
import ModulaversAboutSection from "./componets/About";
import ContactDetectionForm from "./componets/Contact";
import SoftwareCompanyFooter from "./componets/Footer";
import ServicesSection from "./componets/Services";

export default function Home() {
  return (
  <div className="w-[100] items-center justify-items-center min-h-screen ">
  <Welcome />
  {/* <ServicesGrid/> */}

  <ServicesSection/>
    <TeamSection/>
  <ModulaversAboutSection/>
  <ContactDetectionForm/>
  <SoftwareCompanyFooter/>
</div>

  );
}
