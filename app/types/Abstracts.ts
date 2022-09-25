import { TThinkData } from "./git-think";

export abstract class TGitThinkStorage {
	abstract getAll(): Array<TThinkData>
	abstract get(selected: Date): Array<TThinkData>
	abstract add(): void
	abstract push(): void
	abstract pull(): void
}
