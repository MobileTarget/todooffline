# todooffline app
Following are steps to publish app on <strong>Ibm Bluemix node-red platform</strong>,  <strong>IOS Build to Apple store(Itunes)</strong>, <strong>Android build to Google Play store</strong>.

* [Publish app to IBM Bluemix node-red platform](#node_red_platfrom)
* [Pubilsh app to Apple store](#publish_app_ios_store)
* [Publish app to Google play store](#publish_google_play_store)


<a name="node_red_platfrom"></a>
### Do following steps to publish app on IBM Bluemix node-red platform.
- Go IBM Bluemix console (<a href="https://console.bluemix.net/dashboard/apps">IBM Bluemix console</a>).
- Select app and click on `Getting started`.
- Use Bluemix command line interface to download, modify, and redeploy your Cloud Foundry applications and service instances.
- Before you begin, download and install the Bluemix command line interface (<a href="https://console.bluemix.net/docs/cli/reference/bluemix_cli/index.html#getting-started">Install and Getting started with Bluemix-cli</a>).
- You will see a button called `Download start code`. Click on it to download code.
- After download code. Download <a href="https://github.com/MobileTarget/domenow">todooffline(IONIC Code)</a> code.
- Make sure downloaded newly downloaded <a href="https://github.com/MobileTarget/domenow">todooffline(IONIC Code)</a> code works via using `ionic serve` command(Please make sure before running this command <strong>Cordova, Ionic</strong> must be installed on your machine).
- Make a copy of `www` folder content of `todooffline(Ionic code)` to `IBM Bluemix  node-red` downloaded code and replace it with `node-red public` folder content.

After doing above steps now you are ready to deploy code to `IBM Bluemix node-red` platform.You need to follow below command to pubilsh to code. Bute before try to use below command make sure you have installed `IBM Bluemix cli interface tool`.

```
1) bluemix login 
2) bluemix -o <organization_name> -s <space_name>
3) bluemix apps 
4) bluemix push <app_name>
```
Above command will push code to `IBM Bluemix` instance via using `manifest.yml` file.


<a name="publish_app_ios_store"></a>
### Do Following steps to publish app on Apple Store(Itunes).

Below you will find a list of guides, each describing how to do one of the steps required for submitting an app.

 1) [Create a Bundle Identifier](#create_bundle_identifier)
 2) [Create a Certificate Signing Request](#create_certificate)
 3) [Create an App Store Production Certificate](#create_prod_certificate)
 4) [Create a Production Provisioning Profile](#create_provisioning)
 5) [Create an App Store Listing](#create_apple_store_listing)
 6) [Create a Release Build](#realease_build)
 7) [Fill in the Version Information](#fill_version_info)
 8) [Submit Version for Review](#submit_version_review)
 9) [Release](#review)

<a name="create_bundle_identifier"></a>
##### 1) Create a Bundle Identifier

The bundle identifier is the name of your app, as seen by both the App Store and iOS devices.

- In your browser, navigate to <a href="https://idmsa.apple.com/IDMSWebAuth/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2Fios%2Fcertificate%2F&rv=1" target="_blank">Apple’s Developer Portal</a>
- Log in 
- Click Identifiers
- Click the “+” in the top right of the screen
- Name the App ID the same as your app
- Make sure the Bundle ID follows the standard naming convention: `com.yourcompanyname.yourappname`.
- Check any App Services the app needs, click Continue
- Verify the services are correct, then click Submit

<a name="create_certificate"></a>
##### 2) Create a Certificate Signing Request

Certificate Signing Requests are used to link your computer to your Apple developer account.

- Open a program called KeyChain Access
- In the top left menu, click Certificate Assistant
- Click Request a Certificate From a Certificate Authority…
- User email: Enter your email address
- Common Name: We recommend using the name of the app
- CA email is not actually required
- Check Saved to Disk, click Continue
- Save the Certificate Signing Request for later


<a name="create_prod_certificate"></a>
##### 3) Create an App Store Production Certificate
Code Signing Certificates are used to link iOS apps to your Apple developer account.

- In your browser, navigate to <a href="https://developer.apple.com/account/overview.action" target="_blank">Apple’s Developer Portal</a>.
- Click Certificates
- Click the “+” in the top right of the screen
- Click the App Store Production
- Currently named “App Store and Ad Hoc” under Production
- Click Continue
- Upload the Certificate Signing Request created earlier
- Download the Certificate
- Install the certificate on your computer by double clicking
- Keep this file somewhere safe

<a name="create_provisioning"></a>
##### 4) Create a Production Provisioning Profile

Provisioning Profiles are packaged with iOS apps so users devices can install them.

- In your browser, navigate to Apple’s Developer Portal
- Log in
- Click Provisioning Profiles
- Click the “+” in the top right of the screen
- Click the App Store Distribution option, click Continue
- Select the Bundle ID created earlier, click Continue
- Select the Certificate created earlier, click Continue
- Make sure the Profile Name follows the standard naming convention: `App Name App Store Distribution`
- Click Generate
- Download it
- Install the provision profile on your computer by double clicking
- Keep this file somewhere safe

<a name="create_apple_store_listing"></a>
##### 5) Create App Store Listing

Reserve a slot in the App Store for your app for users to see.

- Start in your browser, navigate to <a href="https://itunesconnect.apple.com/" target="_blank">iTunes Connect</a>
- Log in
- Click My Apps
- Click the “+” in the top left of the screen
- Click “New iOS App”
- Bundle ID: choose the one created on Developer Portal
- For convenience, make the SKU match the Bundle ID created earlier
- Click Create to create the first version listing


<a name="realease_build"></a>
##### 6) Make the release build

Package the actual binary that users will be uploading to the store.

- Start Xcode
- Open the project or workspace
- Update the version and build numbers
- Open Build Settings
- Make sure All settings is selected
- Scroll to Code Signing
- Use the provisioning profile created earlier
- Use the code signing identity created earlier
- In the top menu, select Generic iOS Device as the build destination if no actual device is connected
- Menu, Project, Archive
- Click Distribute
- Sign in as your apple developer account
- Submit to app store
- Wait for the confirmation

<a name="fill_version_info"></a>
##### 7) Fill In Version Information

Users will decide whether or not to install your app based on your store listing.

- Enter all of the information assembled in step 1
- Select the build you wish to tie to the version (Note: This usually appears 10-15 minutes after sending from Xcode)
- Fill in pricing information
- Click Save
-  Fit any errors based on the messages that appear and save changes

<a name="submit_version_review"></a>
##### 8) Submit Version for Review

Every app that is submitted to the store has to be reviewed by the Apple team before release.

- Select the release type
- Manual release – after the app is accepted, a Release button will appear
- Automatic release – as soon as the app is accepted, it will be released
- Wait for approval
- This process usually takes 2-3 weeks for a new submission
- If your app was not approved, review the notes in the Resolution Center and make any necessary changes to the app or version information then resubmit

<a name="review"></a>
##### 9) Review
Enjoy the final, most satisfying step.

- If you selected Manual release, click Release your app when ready
- Wait for the green “Ready for Sale” version status (This might take from 1 hour to 1 day after release)
- Search for your app on the App Store
- Celebrate!

###### When submitting a new version of your app, you will only have to repeat steps 6 through 9.


<a name="publish_google_play_store"></a>
### Publish app to Google play store

Publish app on Google play store need to follow below setp one by one.

1) <a href="https://accounts.google.com/signin/v2/identifier?service=googleplay&passive=1209600&continue=https%3A%2F%2Fplay.google.com%2Fstore&followup=https%3A%2F%2Fplay.google.com%2Fstore&flowName=GlifWebSignIn&flowEntry=ServiceLogin">Click here</a> and log in to your Google Play account. 
2) Click <strong>All Applications</strong> and then click + <strong>Add new application</strong>.
![](https://nr1.s3.amazonaws.com/kb/160A734/1DA0FF4/1DBEA09/49/2a-b.png)
3) Select your Default language, enter your app Title and click Upload APK.

4) Click Upload your first APK to Production.
5) Click Browse files, and browse to your .APK file. 
6) Click the Store Listing tab.
7) Fill all the product details like Title, Short description, Full description.
8) Click  + Add Screenshots to add screenshots of your app.

``` 
Note:- You must provide at least 2 screenshots of your app. To have your app displayed in the Designed for tablets section of Google Play, upload tablet screenshots.
```
9) Click + Add high-res icon to add your app icon (must be at least 512 X 512).
10) Click + Add feature graphic. This is a promotional graphic that's displayed at the top of your Store Listing page in the Play Store app. 
11) (Optional) Add a Promo Graphic to promote your app on older versions of Android and a Promo Video (YouTube video URL) to promote your app.
12) Select your Application Type, Category, and Content Rating. 
```
Note:- Google Play's new content rating system requires you to also fill out a rating questionnaire.
```
13) Enter your contact details: website, email and phone number (optional). 
14) You can add a link to your privacy policy in the Privacy Policy box, or select the Not submitting a privacy policy URL at this time. 
15) Scroll to the top of the page and click Save.
16) Click the Pricing & Distribution tab.
17) Choose your app's price by either selecting Free, or Paid. To list you app as a paid app, you must add a merchant account to your Google Play Account. 
```
Note: Once you select and save your app as free, you can't change the price.
```
18) Select the Select All Countries check-box to enable users in all regions to access and download your app, or select specific countries from the list.
19) Read the Consent guidelines and select the check-box to indicate that your app meets the guidelines.
20) Read the US export laws, and select the check-box to indicate your acknowledgment. 
21) Scroll to the top of the page and click Save.
22) Make sure that APK, Store Listing, Content Rating and Price Distribution tabs all have a green check mark next to them:
23) Click Ready to publish.
24) Select Publish this app.

###### Congratulations your app has been published. Within a couple of hours, your app will be available on the Google play android marketplace.




