import { HashesContext } from "@/contexts/hashes-context";
import { useHashes } from "@/hooks/use-hashes";
import { RuleForm } from "../molecules/rule-form";
import { RuleList } from "../molecules/rule-list";

export const Main = () => {
    const hashes = useHashes();

    return (
        <HashesContext.Provider value={hashes}>
            <RuleForm />
            <RuleList />
        </HashesContext.Provider>
    );
};
