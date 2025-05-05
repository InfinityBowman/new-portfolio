import { AboutMeHeader, Contact, Coursework, Education, Experience, Skills } from './about-me-parts';

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-6">
      <AboutMeHeader />
      <div className="flex md:flex-row flex-col w-full justify-evenly gap-6">
        <div className="flex flex-col gap-6">
          <Experience />
          <Coursework />
        </div>
        <div className="flex flex-col gap-6">
          <Contact />
          <Education />
          <Skills />
        </div>
      </div>
    </div>
  );
}
