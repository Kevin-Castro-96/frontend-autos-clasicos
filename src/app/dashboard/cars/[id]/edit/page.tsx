import CarForm from "../../../components/CarForm";

export default function EditCarPage({ params }: { params: { id: string } }) {
  return <CarForm mode="edit" id={params.id} />;
}
