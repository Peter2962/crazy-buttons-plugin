
# Crazy Buttons JS plugin

**Installation** 

    npm install crazy-buttons-js
   
 **Usage**

    import CrazyButton from 'crazy-buttons-js';
    
    Vue.use(CrazyButton);
    
    // Initializing the crazy buttons
	this.$initializeCrazyButton({
		targetContainer: 'demo_ui_target',
	});

	// Optional parameters
	numberOfButtons - You can specify the number of buttons to be displayed
	extraActions (Array of functions) - An array containing functions that are added to the default actions 