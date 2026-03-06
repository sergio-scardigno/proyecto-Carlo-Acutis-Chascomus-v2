"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

type FormData = {
  name: string;
  email: string;
  message: string;
  tel: string;
  link: string;
};

type FormErrors = Partial<Record<keyof Pick<FormData, "email" | "tel">, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  tel: "",
  link: "",
};

function buildWhatsappLink(phone: string) {
  const formattedPhoneNumber = phone.replace(/\D/g, "");
  return formattedPhoneNumber ? `https://wa.me/+${formattedPhoneNumber}` : "";
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, tel: value ?? "" }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Por favor, ingresa un correo electronico valido.";
    }

    if (!formData.tel) {
      newErrors.tel = "Por favor, ingresa tu numero de telefono.";
    } else if (!isValidPhoneNumber(formData.tel)) {
      newErrors.tel = "Por favor, ingresa un telefono valido con codigo de pais.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus("");
      setStatusType(null);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("Falta configurar EmailJS en las variables de entorno.");
      setStatusType("error");
      return;
    }

    const whatsappLink = buildWhatsappLink(formData.tel);
    const formElement = e.currentTarget;
    const hiddenLinkInput = formElement.querySelector<HTMLInputElement>('[name="link"]');
    if (hiddenLinkInput) {
      hiddenLinkInput.value = whatsappLink;
    }

    setFormData((prev) => ({ ...prev, link: whatsappLink }));

    try {
      await emailjs.sendForm(serviceId, templateId, formElement, { publicKey });
      setStatus("Mensaje enviado con exito.");
      setStatusType("success");
      setErrors({});
      setFormData(initialFormData);
    } catch {
      setStatus("Hubo un error al enviar el mensaje.");
      setStatusType("error");
    }
  };

  return (
    <div className="surface-card mx-auto w-full rounded-2xl p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@dominio.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email ? <p className="mt-1 text-sm text-blue-600">{errors.email}</p> : null}
        </div>

        <div>
          <PhoneInput
            international
            name="tel"
            defaultCountry="AR"
            value={formData.tel || undefined}
            onChange={handlePhoneChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Agrega tu telefono"
          />
          {errors.tel ? <p className="mt-1 text-sm text-blue-600">{errors.tel}</p> : null}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Tu mensaje"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
          />
        </div>

        <input type="hidden" name="link" value={formData.link} readOnly />

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-auto"
          >
            Enviar
          </button>
        </div>
      </form>

      {status ? (
        <p className={`mt-4 text-center ${statusType === "error" ? "text-red-600" : "text-green-500"}`}>
          {status}
        </p>
      ) : null}
    </div>
  );
}
