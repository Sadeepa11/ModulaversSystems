import Welcome from "./componets/Welcome";
import ServicesGrid from "./componets/services";
import TeamSection from "./componets/TeamSection";
import ModulaversAboutSection from "./componets/About";
import ContactDetectionForm from "./componets/Contact";
import SoftwareCompanyFooter from "./componets/Footer";

export default function Home() {
  return (
  <div className="w-[100] items-center justify-items-center min-h-screen ">
  <Welcome />
  <ServicesGrid/>
  <TeamSection/>
  <ModulaversAboutSection/>
  <ContactDetectionForm/>
  <SoftwareCompanyFooter/>
</div>

  );
}
