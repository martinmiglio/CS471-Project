import Jumbotron from "@/components/Jumbotron";

export default function AboutPage() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <Jumbotron />
        <h1 className="text-2xl font-semibold tracking-tight text-left">
          About Biddr.pro
        </h1>

        <div className="text-xl flex flex-col space-y-2 text-left">
          <p>
            <span className="text-primary">Biddr.pro</span> was created as an ambitious endeavor by a team of
            skilled individuals inspired and tasked to push the boundaries of
            their knowledge. With a shared passion for innovation and a
            commitment to the project, they began the construction of a site
            that would use their collective talents and expertise in a tangible
            way. With a shared vision, they sought to create a platform that not
            only showcases their capabilities but also serves as a testament to
            their unwavering commitment to growth and advancement.
          </p>
        
          <p>
            This site exists as a proof of concept and a project born from the
            classroom setting. As such, it's imperative to iterate that{" "}
            <span className="text-primary">Biddr.pro</span> is not equipped to handle real transactions or
            sensitive information securely. We caution users against entering
            any genuine credit card details or divulging any personal
            information that should remain confidential. While our team has
            diligently worked to create a functional interface, this website
            lacks the robust security measures necessary for handling sensitive
            data.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
