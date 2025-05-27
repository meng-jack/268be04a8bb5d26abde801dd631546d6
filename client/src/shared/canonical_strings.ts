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

    export function getTimeAgoString(time: Date): string {
        const timePast = Math.trunc((+new Date() - +time) / 8.64e+7);
        if (timePast === 0) {
            return canonical.timeago.today;
        } else if (timePast === 1) {
            return canonical.timeago.yesterday;
        }
        return `${timePast} ${canonical.timeago.ago}`;
    }
}