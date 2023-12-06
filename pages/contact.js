import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";

export default function Contact() {
  // Utilisation de useState pour gérer l'état du formulaire de contact
  const [submitStatus, setSubmitStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [alertColor, setAlertColor] = useState("bg-green-500");

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    // Empêche le comportement par défaut du clic sur le lien
    event.preventDefault();

    // Extraction des données du formulaire
    const data = {
      firstName: event.target.firstName.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };

    // Conversion des données en format JSON
    const jsonData = JSON.stringify(data);

    // Envoi d'une requête POST au backend via l'API "/api/form"
    const response = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    // Extraction du résultat de la réponse en format JSON
    const result = await response.json();
    console.log(result.data);

    // Mise à jour de l'état en fonction du succès ou de l'échec de la réponse
    setSubmitStatus(true);
    setResponseMessage(result.data);

    // Mise à jour de l'état en fonction du succès ou de l'échec de la réponse
    if (!response.ok) {
      setAlertColor("bg-red-500");
    } else {
      setAlertColor("bg-green-500");
    }
  };

  // Rendu de la page de contact
  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-contact"></SiteHeader>
      </section>

      <section>
        <div className="container mx-auto lg:max-w-4xl">
          <h1 className="text-4xl text-center text-sate-700 py8">Contact Us</h1>
          {/* Formulaire de contact avec gestionnaire d'événements onSubmit */}
          <form action="" className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="">First Name:</label>
            <input type="text" id="firstName" name="firstName" />
            <label htmlFor="">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Submit</button>
          </form>

          {/* Affichage de l'alerte de soumission en fonction de l'état submitStatus */}
          {submitStatus ? (
            <SubmissionAlert
              message={responseMessage}
              alertColor={alertColor}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

// Composant fonctionnel pour afficher l'alerte de soumission
const SubmissionAlert = ({ message, alertColor }) => {
  return <div className={`${alertColor}`}>{message}</div>;
};
