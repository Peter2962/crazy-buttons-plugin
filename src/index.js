import Swal from 'sweetalert2';
const axios = require('axios');
import randomItem from 'random-item';
import randomInteger from 'random-int';
const randomObjectKey = require('random-obj-key');

export default {
	install(Vue) {
		Vue.prototype.$initializeCrazyButton = (options = {}) => {
			const getRandomId = () => {
				return Math.random().toString(36).substring(5);
			}

			let { targetContainer, numberOfButtons, extraActions } = options;

			let defaultActions = [
				function(button) {
					console.log('Executing removeSelf');

					// Because we are removing this button, we need to remove it from
					// `clickedButtons` array.

					clickedButtons.splice(0, clickedButtons.indexOf(button.getAttribute('custom-crazy-button-id')));
					button.remove();
				},
				function(button) {
					console.log('Executing addNewButton');
					attachButtonToContainer();
				},
				function(button) {
					const crazyButtonObjs = document.querySelectorAll('[custom-crazy-button]');
					console.log('Executing removeUnclicked');

					// Loop through `crazyButtonObjs` array and check for a button that does not have
					// its `id` in the array.
					
					var unclickedButton = null;

					for (let i = 0; i < crazyButtonObjs.length; i++) {
						if (!clickedButtons.includes(crazyButtonObjs[i].getAttribute('custom-crazy-button-id'))) {
							unclickedButton = crazyButtonObjs[i];
							break;
						}
					}

					if (!unclickedButton) {
						Swal.fire({
							title: 'Sorry!',
							text: 'All buttons have been clicked :(',
							icon: 'error',
							confirmButtonText: 'Close'
						});

						return;
					}
					clickedButtons.splice(0, clickedButtons.indexOf(unclickedButton.getAttribute('custom-crazy-button-id')));
					unclickedButton.remove();
				},
				function(button) {
					console.log('Executing showCurrentTemperature');

					axios.get('http://api.weatherapi.com/v1/current.json?key=f4adfec58394496ea1684801210404&q=Japan').then((res) => {
						Swal.fire({
							title: 'Information fetched',
							text: `Current temperature: ${res.data.current.temp_c} - ${res.data.current.temp_f}`,
							icon: 'info',
							confirmButtonText: 'Close'
						});
					}).catch((err) => {
						Swal.fire({
							title: 'Error!',
							text: 'Unable to get weather information for Japan',
							icon: 'error',
							confirmButtonText: 'Close'
						});
						console.log(err);
					});
				}
			];

			// If extraActions is defined, merge it with default actions
			if (Array.isArray(extraActions)) {
				defaultActions = defaultActions.concat(extraActions);
			}

			const defaultDesigns = [
				'btn btn-primary ml-1 mr-1 mb-2 font-weight-bold',
				'btn btn-danger ml-1 mr-1 mb-2 font-weight-bold',
				'btn btn-warning ml-1 mr-1 mb-2 font-weight-bold'
			];

			const clickedButtons = [];

			// Return a customized console error.
			const doConsoleError = (text) => {
				console.log(`%c ${text}`, 'background-color: #ddd; color: red; font-weight: 900');
			};

			// Attachs a button to the target container.
			const attachButtonToContainer = (index) => {
				const buttonEl = document.createElement('Button');
				buttonEl.innerHTML = 'Crazy button';
				buttonEl.setAttribute('class', randomItem(defaultDesigns));
				buttonEl.setAttribute('custom-crazy-button', '');
				buttonEl.setAttribute('custom-crazy-button-id', `custom-crazy-button-id-${getRandomId()}`);

				// append button to target container
				targetContainerObj.appendChild(buttonEl);
				bindRandomActionToButton(buttonEl);
			};

			// Selects a random action and binds it to a crazybutton
			const bindRandomActionToButton = (button) => {
				button.addEventListener('click', () => {
					const randomAction = randomItem(defaultActions);

					// If the button-id does not exist in `clickedButtons` array, then add it. 
					if (!clickedButtons.includes(button.getAttribute('custom-crazy-button-id'))) {
						clickedButtons.push(button.getAttribute('custom-crazy-button-id'));
					}

					randomAction(button, button.getAttribute('custom-crazy-button-id'));
				});
			};

			// to add random colours to buttons
			const randomColours = [];

			// find target container
			const targetContainerObj = document.getElementById(targetContainer)
			if (!targetContainerObj) {
				return doConsoleError(`Unable to find target container (${targetContainer}) for crazy buttons.`)
			}

			const button = {};
			const renderButton = () => {
				if (!parseInt(numberOfButtons)) {
					numberOfButtons = randomInteger(3, 6);
				}

				if (numberOfButtons < 2 || numberOfButtons > 6) {
					Swal.fire({
						title: 'Error!',
						text: `Buttons must be minimum of 2 and maximum of 6`,
						icon: 'error',
						confirmButtonText: 'Close'
					});

					return;
				}

				for(let i = 0; i < numberOfButtons; i++) {
					attachButtonToContainer(i);
				}
			};

			renderButton();
		}
	}
}