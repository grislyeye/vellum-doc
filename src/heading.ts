export class Heading {
  private readonly heading: HTMLHeadingElement
  readonly previousHeading?: Heading
  readonly nextHeading?: Heading
  readonly id: string

  constructor(
    heading: HTMLHeadingElement,
    previousHeading: Heading | undefined,
    nextHeading: Heading | undefined
  ) {
    this.heading = heading
    this.previousHeading = previousHeading
    this.nextHeading = nextHeading
    this.id = heading.id
  }

  get element(): HTMLHeadingElement {
    return this.heading
  }

  get level(): number {
    return Number(this.heading.tagName.match(/H([1-6])/)![1])
  }

  get isNewSubsection(): Boolean {
    return this.previousHeading !== undefined && this.level < this.previousHeading.level
  }

  get isNewSection(): Boolean {
    return this.previousHeading === undefined || this.level > this.previousHeading.level
  }

  get isLastHeading() : Boolean {
    return this.isLastHeading === undefined
  }

  clean(): void {
    this.heading.removeAttribute('id')
  }
}
