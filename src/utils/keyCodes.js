export const returnOrEnter = 13;
export const deleteOrBackspace = 8;
export const tab = 9;
export const space = 32;

export const shiftModifier = 16;
export const optionModifier = 18;
export const commandModifier = 91;

export function isModifier(keyCode) {
	switch (keyCode) {
		case shiftModifier:
		case optionModifier:
		case commandModifier:
			return true;
		default:
			return false;
	}
}
