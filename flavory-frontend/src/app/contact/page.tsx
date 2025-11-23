import { Mail, Facebook, Instagram } from "lucide-react";

export default function Contact() {

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold text-center mb-10 text-red-600"
          data-aos="fade-down"
        >
          Contactez-nous
        </h1>

        <div
          className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6"
          data-aos="zoom-in"
        >
          <p className="text-lg leading-relaxed">
            Vous avez une question, une suggestion ou une idée d’amélioration
            pour <span className="font-semibold">TuniCook</span> ? Nous serions
            ravis d’échanger avec vous !
          </p>

          <div className="space-y-3" data-aos="fade-up" data-aos-delay="150">
            <div className="flex items-center gap-3">
              <Mail className="text-red-500" />
              <span>contact@tunicook.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Facebook className="text-blue-600" />
              <a
                href="https://facebook.com/tunicook"
                className="hover:underline"
              >
                facebook.com/tunicook
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="text-pink-500" />
              <a
                href="https://instagram.com/tunicook"
                className="hover:underline"
              >
                instagram.com/tunicook
              </a>
            </div>
          </div>

          <p
            className="text-gray-600 italic mt-6"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            N’hésitez pas à nous écrire pour toute demande de collaboration ou
            simplement pour partager votre passion de la cuisine tunisienne 🍽️
          </p>
        </div>
      </section>
    </main>
  );
}
