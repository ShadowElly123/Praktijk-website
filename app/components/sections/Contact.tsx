import type { Content } from "../../lib/locale";
import { Reveal } from "../Reveal";
import { ContactForm } from "../ContactForm";
import { Editable } from "../review/Editable";

/**
 * Contact — eigen, rustige sectie met titel, korte intro en het formulier.
 * Losgekoppeld van Praktisch zodat die sectie kalmer oogt.
 */
export function Contact({ c }: { c: Content }) {
  return (
    <section
      aria-label={c.contact.title}
      data-section="contact"
      className="sec-x"
      style={{
        position: "relative",
        paddingTop: "12vh",
        paddingBottom: "16vh",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <Reveal>
          <h2
            style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px,3.2vw,40px)",
              color: "var(--title)",
            }}
          >
            <Editable path="contact.title">{c.contact.title}</Editable>
          </h2>
          <p
            style={{
              margin: "0 0 40px",
              maxWidth: "46ch",
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            <Editable path="contact.intro">{c.contact.intro}</Editable>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm c={c} />
        </Reveal>
      </div>
    </section>
  );
}
