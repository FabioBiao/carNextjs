import { useRouter } from "next/router";

export interface SearchProps {
    makes: [];
    models: [];
}

export default function CarSearch({ makes, models }: SearchProps) {
  return (
    <div>
      {/* <Form>
      </Form> */}
        <div className="flex flex-col">
            <div>search will be here</div>
        </div>
    </div>
  );
}
