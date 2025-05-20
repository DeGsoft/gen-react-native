# Create a production build locally
## Learn how to create a production build for your Expo app locally.

To create your app's production build (also known as release build) locally, you need to follow separate steps on your computer and use the tools required to create any native app. This guide provides the necessary steps for Android and iOS.

## Android

Creating a production build locally for Android requires signing it with an [upload key](https://developer.android.com/studio/publish/app-signing#certificates-keystores) and generating an Android Application Bundle (**.aab**). Follow the steps below:

### Prerequisites

- [OpenJDK distribution](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local#install-watchman-and-jdk) installed to access the `keytool` command
- **android** directory generated. If you are using [CNG](https://docs.expo.dev/workflow/continuous-native-generation), then run `npx expo prebuild` to generate it.

### Create an upload key

#### Already created a build with EAS Build? Download your credentials and skip to the next step.

If you've already created a build with EAS Build, follow the steps below to download the credentials, which contains the upload key and its password, key alias, and key password:

1. In your terminal, run `eas credentials -p android` and select the build profile.
2. Select **credentials.json** > **Download credentials from EAS to credentials.json**.
3. Move the downloaded **keystore.jks** file to the **android/app** directory.
4. Copy the values for the upload keystore password, key alias, and key password from the **credentials.json** as you will need them in the next step.

Inside your Expo project directory, run the following `keytool` command to create an upload key:

```bash
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

```bash
sudo keytool -list -v -keystore my-upload-key.keystore -alias my-key-alias
```

After running this command, you will be prompted to enter a password for the keystore. This password will protect the upload key. Remember the password you enter here, as you'll need it in the next step.

This command also generates the keystore file named **my-upload-key.keystore** in your project directory. Move it to the **android/app** directory.

> **warning** If you commit the **android** directory to a version control system like Git, don't commit this keystore file. It contains your upload key and should be kept private.

### Update gradle variables

Open **android/gradle.properties** file and add the following gradle variables at the end of the file. Replace the `*****` with the correct keystore and key password that you provided in the previous step.

These variables contain information about your upload key:

```groovy android/gradle.properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

> **warning** If you commit the **android** directory to a version control system like Git, don't commit the above information. Instead, create a **~/.gradle/gradle.properties** file on your computer and add the above variables to this file.

### Add signing config to build.gradle

Open **android/app/build.gradle** file and add the following configuration:

android/app/build.gradle
```
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
+        release {
+            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
+                storeFile file(MYAPP_UPLOAD_STORE_FILE)
+                storePassword MYAPP_UPLOAD_STORE_PASSWORD
+                keyAlias MYAPP_UPLOAD_KEY_ALIAS
+                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
+            }
+        }
    }
    buildTypes {
        debug {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
+            signingConfig signingConfigs.release
            shrinkResources (findProperty('android.enableShrinkResourcesInReleaseBuilds')?.toBoolean() ?: false)
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
```

### Generate release Android Application Bundle (aab)

Navigate inside the **android** directory and create a production build in **.aab** format by running Gradle's `bundleRelease` command:

```bash
cd android && ./gradlew app:bundleRelease
```

This command will generate app-release.aab inside the **android/app/build/outputs/bundle/release** directory.

### Manual app submission to Google Play Console

Google Play Store requires manual app submission when submitting the **.aab** file for the first time.

[Manual submission of an Android app-Follow the steps from the FYI guide on manually submitting your app to Google Play Store for the first time.](
https://expo.fyi/first-android-submission)

## iOS

To create an iOS production build locally for Apple App Store, you need to use Xcode which handles the signing and submission process via App Store Connect.

### Prerequisites

- Paid Apple Developer membership
- [Xcode installed](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=physical&mode=development-build&buildEnv=local#set-up-xcode-and-watchman) on your computer
- **ios** directory generated. If you are using [CNG](https://docs.expo.dev/workflow/continuous-native-generation), then run `npx expo prebuild` to generate it.

### Open iOS workspace in Xcode

Inside your Expo project directory, run the following command to open `your-project.xcworkspace` in Xcode:

```bash
xed ios
```

After opening the iOS project in Xcode:

1. From the sidebar on the left, select your app's workspace.
2. Go to **Signing & Capabilities** and select **All** or **Release**.
3. Under **Signing** > **Team**, ensure your Apple Developer team is selected. Xcode will generate an automatically managed Provisioning Profile and Signing Certificate.

### Configure a release scheme

To configure your app's release scheme:

1. From the menu bar, open **Product** > **Scheme** > **Edit Scheme**.
2. Select **Run** from the sidebar, then set the **Build configuration** to **Release** using the dropdown.

### Build app for release

To build your app for release, From the menu bar, open **Product** > **Build**. This step will build your app binary for release.

### App submission using App Store Connect

Once the build is complete, you can distribute your app to TestFlight or submit it to the App Store using App Store Connect:

1. From the menu bar, open **Product** > **Archive**.
2. Under **Archives**, click **Distribute App** from the right sidebar.
3. Click **App Store Connect** and follow the prompts shown in the window. This step will create an app store record and upload your app to the App Store.
4. Now you can go to your App Store Connect account, select your app under Apps, and submit it for testing using TestFlight or prepare it for final release by following the steps in the App Store Connect dashboard.