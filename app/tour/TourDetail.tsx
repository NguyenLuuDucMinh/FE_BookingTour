interface TourDetailProps {
    title: string;
    description: string;
    itinerary: string[];
  }
  
  export default function TourDetail({ title, description, itinerary }: TourDetailProps) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <ul className="list-disc list-inside">
          {itinerary.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }