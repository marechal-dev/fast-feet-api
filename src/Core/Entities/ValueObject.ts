export abstract class ValueObject<TProps> {
	protected props: TProps;

	protected constructor(props: TProps) {
		this.props = props;
	}

	public equals(vo: ValueObject<unknown>) {
		if (vo === null || vo === undefined) {
			return false;
		}

		if (vo.props === undefined) {
			return false;
		}

		return JSON.stringify(vo.props) === JSON.stringify(this.props);
	}
}
