import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";
import Image from "next/image";

type NovenaDay = {
	dayTitle: string;
	meditationTitle: string;
	quote: string;
	reflection: string;
	prayer: string;
	image: string;
	imageAlt: string;
};

const openingPrayer = [
	"Santisima Trinidad, Padre, Hijo y Espiritu Santo, te adoro profundamente y te doy gracias por todos los favores y las gracias con las que has enriquecido el alma del Santo Carlo Acutis durante sus 15 anos vividos en esta tierra y, por los meritos de este amado angel de la juventud, concedeme la gracia que ardientemente te pido.",
	"(Se dice la gracia que se desea alcanzar).",
];

const closingPrayer = [
	"Dios Padre de misericordia, eleva a la gloria de los altares al Santo Carlo Acutis, para que por medio de el Tu seas cada vez mas glorificado.",
	"Concedenos el honor de llamarlo santo, pues el siempre ha cumplido tu voluntad en todas las cosas, y por sus meritos concedeme la gracia que ardientemente deseo.",
	"Amen.",
];

const commonRosaryText =
	"Se rezan 5 Padrenuestros, 5 Ave Marias y 5 Gloria al Padre, en accion de gracias a Dios por los dones concedidos a Carlo en los 15 anos de su vida terrena.";

const novenaDays: NovenaDay[] = [
	{
		dayTitle: "MEDITACION DEL PRIMER DIA",
		meditationTitle: "No yo, sino Dios.",
		quote: "No yo, sino Dios.",
		reflection: "Santo Carlo Acutis, que has hecho de tu vida una continua renuncia y anonadamiento...",
		prayer: commonRosaryText,
		image: "/img/oracion/primer_dia.jpg",
		imageAlt: "Meditacion del primer dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL SEGUNDO DIA",
		meditationTitle: "Estar siempre unido a Jesus, he aqui mi programa de vida.",
		quote: "Estar siempre unido a Jesus, he aqui mi programa de vida.",
		reflection: "Santo Carlo Acutis, que has vivido siempre unido al Corazon de Jesus...",
		prayer: commonRosaryText,
		image: "/img/oracion/segundo_dia.jpg",
		imageAlt: "Meditacion del segundo dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL TERCER DIA",
		meditationTitle:
			"Pide continuamente ayuda a tu Angel de la guarda, pues el tiene que llegar a ser tu mejor amigo.",
		quote:
			"Pide continuamente ayuda a tu Angel de la guarda, pues el tiene que llegar a ser tu mejor amigo.",
		reflection:
			"Santo Carlo Acutis, que has buscado, ya en este mundo, la compania de los Santos Angeles, alcanzame la gracia de vivir con rectitud, como te lo inspiro tu Angel. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/tercer_dia.jpg",
		imageAlt: "Meditacion del tercer dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL CUARTO DIA",
		meditationTitle:
			"El globo aerostatico: para subir hacia lo alto necesita descargar peso, asi como el alma para elevarse al Cielo necesita quitar tambien aquellos pequenos pesos que son los pecados veniales.",
		quote:
			"El globo aerostatico: para subir hacia lo alto necesita descargar peso, asi como el alma para elevarse al Cielo necesita quitar tambien aquellos pequenos pesos que son los pecados veniales. Si por casualidad hay un pecado mortal el alma se queda al piso, y la Confesion es como el fuego que hace subir al Cielo el globo aerostatico. Es necesario confesarse con frecuencia.",
		reflection:
			"Santo Carlo Acutis, que has vivido tan bien este Sacramento de la Reconciliacion, alcanzame la gracia de acercarme con frecuencia a la confesion con un arrepentimiento profundo. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/cuarto_dia.jpg",
		imageAlt: "Meditacion del cuarto dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL QUINTO DIA",
		meditationTitle: "La tristeza es la mirada orientada a nosotros mismos, la felicidad es la mirada orientada a Dios.",
		quote:
			"La tristeza es la mirada orientada a nosotros mismos, la felicidad es la mirada orientada a Dios.",
		reflection:
			"Santo Carlo Acutis, que nunca has apartado la mirada de Jesus, tu gran amor, alcanzame la gracia de vivir ya en este mundo esta felicidad autentica. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/quinto_dia.jpg",
		imageAlt: "Meditacion del quinto dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL SEXTO DIA",
		meditationTitle: "Lo unico que debemos pedir a Dios en la oracion es el deseo de llegar a ser santos.",
		quote: "Lo unico que debemos pedir a Dios en la oracion es el deseo de llegar a ser santos.",
		reflection:
			"Santo Carlo Acutis, que siempre has sabido pedir a Dios lo esencial, alcanzame la gracia de un profundo deseo del Cielo. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/sexto_dia.jpg",
		imageAlt: "Meditacion del sexto dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL SEPTIMO DIA",
		meditationTitle: "La Virgen es la unica mujer de mi vida.",
		quote: "La Virgen es la unica mujer de mi vida.",
		reflection:
			"Santo Carlo Acutis, que has amado a la Virgen Maria mas que a nadie, alcanzame la gracia de responder siempre al amor de esta Madre tan dulce y tan buena. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/septimo_dia.jpg",
		imageAlt: "Meditacion del septimo dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL OCTAVO DIA",
		meditationTitle: "La Eucaristia es mi autopista hacia el Cielo.",
		quote: "La Eucaristia es mi autopista hacia el Cielo.",
		reflection:
			"Santo Carlo Acutis, que buscabas siempre a tu Jesus oculto en el Sagrario, alcanzame la gracia de un profundo fervor eucaristico. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/octavo_dia.jpg",
		imageAlt: "Meditacion del octavo dia de la novena al Santo Carlo Acutis",
	},
	{
		dayTitle: "MEDITACION DEL NOVENO DIA",
		meditationTitle:
			"Muero sereno, porque no he vivido ni siquiera un minuto de mi vida en cosas que no agradan a Dios.",
		quote:
			"Muero sereno, porque no he vivido ni siquiera un minuto de mi vida en cosas que no agradan a Dios.",
		reflection:
			"Santo Carlo Acutis, alcanzame la gracia de las gracias, o sea la perseverancia final y una muerte santa. Amen.",
		prayer: commonRosaryText,
		image: "/img/oracion/noveno_dia.jpg",
		imageAlt: "Meditacion del noveno dia de la novena al Santo Carlo Acutis",
	},
];

export default function NovenaPage() {
	return (
		<main className="page-shell">
			<div className="page-content max-w-4xl">
				<PageHeader
					title="Novena al Santo Carlo Acutis"
					description="Oracion inicial, meditaciones diarias y oracion final para rezar la novena completa."
				/>

				<SurfaceCard className="mx-auto mt-10 max-w-3xl space-y-3">
					<h2 className="text-lg font-semibold text-primary-700">ORACION INICIAL</h2>
					{openingPrayer.map((paragraph) => (
						<p key={paragraph} className="text-primary-700/90">
							{paragraph}
						</p>
					))}
				</SurfaceCard>

				<div className="mt-8 space-y-6">
					{novenaDays.map((day, index) => (
						<SurfaceCard key={day.dayTitle} className="space-y-4">
							<div className="space-y-2">
								<p className="text-sm font-semibold tracking-wide text-primary-500">{day.dayTitle}</p>
								<p className="text-base italic text-primary-700">"{day.quote}"</p>
							</div>

							<div className="grid gap-4 md:grid-cols-[1.1fr_1fr] md:items-start">
								<div className="space-y-3">
									<h3 className="text-base font-semibold text-primary-700">{day.meditationTitle}</h3>
									<p className="text-primary-700/90">{day.reflection}</p>
									<p className="text-primary-700/80">{day.prayer}</p>
								</div>
								<div className="overflow-hidden rounded-xl border border-primary-200/70">
									<Image
										src={day.image}
										alt={day.imageAlt}
										width={1200}
										height={800}
										priority={index === 0}
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</SurfaceCard>
					))}
				</div>

				<SurfaceCard className="mx-auto mt-8 max-w-3xl space-y-3">
					<h2 className="text-lg font-semibold text-primary-700">ORACION FINAL</h2>
					{closingPrayer.map((paragraph) => (
						<p key={paragraph} className="text-primary-700/90">
							{paragraph}
						</p>
					))}
				</SurfaceCard>
			</div>
		</main>
	);
}


