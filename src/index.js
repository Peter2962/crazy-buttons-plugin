export default {
	install(Vue) {
		Vue.prototype.$initializeCrazyButton = (options = {}) => {
			const { targetContainer, numberOfButtons, extraActions } = options;
			const defaultActions = {
				removeSelf: () => {},
				addNewButton: () => {},
				removeUnclicked: () => {},
				showCurrentTemperature: () => {}
			};

			// to add random colours to buttons
			const randomColours = [];

			// find target container
			const targetContainerObj = document.getElementById(targetContainer)
			if (!targetContainerObj) {
				return console.log(`%c Unable to find target container (${targetContainer}) for crazy buttons.`, 'background-color: #ddd; color: red; font-weight: 900');
			}

			const button = {};
			const renderButton = () => {
				for(let i = 0; i < numberOfButtons; i++) {
					const buttonEl = document.createElement('Button');
					buttonEl.innerHTML = 'Crazy button';
					buttonEl.setAttribute('class', 'btn btn-primary ml-1 mr-1 font-weight-bold');
					buttonEl.setAttribute('custom-crazy-button', '');

					// append button to target container
					targetContainerObj.appendChild(buttonEl);
				}
			};

			const crazyButtonObjs = {};

			renderButton();
		}
	}
}