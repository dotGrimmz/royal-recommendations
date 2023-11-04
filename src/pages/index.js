import { useQuestions } from "@/hooks/useQuestions";
import { Questions } from "@/components/Questions";
export default function Home() {
  const { questions } = useQuestions();
  return <Questions questions={questions} />;
}
