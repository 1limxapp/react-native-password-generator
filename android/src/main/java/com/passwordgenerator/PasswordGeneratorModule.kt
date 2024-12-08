package com.passwordgenerator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.facebook.common.util.Hex
import java.util.Base64
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey

class PasswordGeneratorModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun generateSymmetricKey(outputEncoding: String, promise: Promise) {
    try {
      if (outputEncoding != "base64" && outputEncoding != "hex") {
        return promise.reject("Output encoding error", "Output encoding should be in 'base64' or 'hex'", null)
      }
      val keygen = KeyGenerator.getInstance("ChaCha20")

      keygen.init(128)
      val key: SecretKey = keygen.generateKey()
      val encodedKey = if (outputEncoding == "base64")
        String(Base64.getEncoder().encode(key.encoded))
      else Hex.encodeHex(key.encoded, false)

      promise.resolve(encodedKey)
    } catch (e: Exception) {
      promise.reject("generate symmetric key", e.localizedMessage, e)
    }
  }

  companion object {
    const val NAME = "PasswordGenerator"
  }
}
