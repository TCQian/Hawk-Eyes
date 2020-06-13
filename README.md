# Sample Snack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by clicking the **Run** button or use the simulator by clicking **Tap to Play**. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Export** your project and use it with [expo-cli](https://docs.expo.io/versions/latest/introduction/installation.html).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the **Embed** button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.io).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack-web).

---

# First Timer

Run this command:

`npm install`

This shall download all the dependencies and takes a while.

For subsequent development run this:

`npm start`

# For Windows user with iPhone available

1. Download [@Expo App](https://apps.apple.com/us/app/expo-client/id982107779) in your iPhone.
1. Clone the repository from github: 

    `git clone [url]`
1. Go into Hawk-Eyes directory. (use `cd`)
1. Run:
    
    `npm install expo-cli --global`
    
    This shall install expo-cli on your local machine.

1. Run:

    `npm install`

    This shall install all the required dependencies for your app to run properly.

    **Note: all the dependencies are listed in `app.json` file**

1. Run the command and **scan** the QR code in the web server promted on your browser.

    `npm start`

1. You should be redirected to your **Expo App** and able to see your app on your iPhone.
1. Each time you update your files on your local machine you should see your phone being updated.

# Adding dependencies

*Dependencies mean all the third-party modules such as Firebase, Redux, Thunk, etc.*

Run command with this format:

`npm install -S [dependency-name]`

Example:

`npm install -S firebase'

This will update the node modules file and you should have no problem importing the module for use.
