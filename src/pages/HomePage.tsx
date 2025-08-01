import { Container } from "../components/Container";
import { Featured } from "../components/Featured";
import { Wellcome } from "../components/Wellcome";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <Container>
        <Wellcome />
      </Container>
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 py-12">
        <Container>
          <Featured />
        </Container>
      </div>
    </div>
  );
};
