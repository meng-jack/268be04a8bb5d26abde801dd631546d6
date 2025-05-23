import { canonical } from "../assets/strings.json";
export namespace ComputedStrings {
    export function getTimeBasedGreeting(): string {
        const now = new Date();
        if (now.getHours() >= 5 && now.getHours() < 12) {
            return canonical.greetings.morning;
        } else if (now.getHours() >= 12 && now.getHours() < 18) {
            return canonical.greetings.afternoon;
        }
        return canonical.greetings.evening;
    }
}