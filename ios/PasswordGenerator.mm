#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PasswordGenerator, NSObject)

RCT_EXTERN_METHOD(generateSecureRandomData:(NSString *)outputEncoding
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
