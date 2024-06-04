import { Logger } from '@nestjs/common';

/**
 * The decorator log method name/property where it is used with debug level
 */
export const PrintLog = (_target, methodName, descriptor) => {
  descriptor.value = new Proxy(descriptor.value, {
    apply: function (target, thisArg, args) {
      printDebug(thisArg, methodName, args);

      const result = target.apply(thisArg, args);
      return result;
    }
  });
};

/**
 * The decorator log method name/property where it is used with debug level
 * Print full log with input and output
 */
export const PrintFullLog = (_target, methodName, descriptor) => {
  descriptor.value = new Proxy(descriptor.value, {
    apply: function (target, thisArg, args) {
      printDebug(thisArg, methodName, args);

      const result = target.apply(thisArg, args);

      printDebugResponse(thisArg, methodName, result);

      return result;
    }
  });
};

/**
 * The decorator log method name where it is used with debug level
 */
export const PrintLogAction = (_target, methodName, descriptor) => {
  descriptor.value = new Proxy(descriptor.value, {
    apply: function (target, thisArg, args) {
      printDebug(thisArg, methodName);

      const result = target.apply(thisArg, args);
      return result;
    }
  });
};

/**
 * The decorator log method name/property where it is used with debug level
 */
export const PrintLogVerbose = (_target, methodName, descriptor) => {
  descriptor.value = new Proxy(descriptor.value, {
    apply: function (target, thisArg, args) {
      printVerbose(thisArg, methodName, args);

      const result = target.apply(thisArg, args);
      return result;
    }
  });
};

/**
 * The decorator log method name/property where it is used with debug level
 * Print full log with input and output
 */
export const PrintFullLogVerbose = (_target, methodName, descriptor) => {
  descriptor.value = new Proxy(descriptor.value, {
    apply: function (target, thisArg, args) {
      printVerbose(thisArg, methodName, args);

      const result = target.apply(thisArg, args);

      printVerboseResponse(thisArg, methodName, result);

      return result;
    }
  });
};
/**
 * The decorator log method name where it is used with debug level
 */
export const PrintLogVerboseAction = (_target, methodName, descriptor) => {
  descriptor.value = new Proxy(descriptor.value, {
    apply: function (target, thisArg, args) {
      printVerbose(thisArg, methodName);

      const result = target.apply(thisArg, args);
      return result;
    }
  });
};

function printVerbose(instance: any, methodName: string, args?: any[]) {
  printRequest('verbose', instance, methodName, args);
}

function printVerboseResponse(instance: any, methodName: string, result?: any) {
  printResponse('verbose', instance, methodName, result);
}

function printDebug(instance: any, methodName: string, args?: any[]) {
  printRequest('debug', instance, methodName, args);
}

function printDebugResponse(instance: any, methodName: string, result?: any) {
  printResponse('debug', instance, methodName, result);
}

function printRequest(level: string, instance: any, methodName: string, args?: any[]) {
  const params = args ? `: ${JSON.stringify(args)}` : '';
  if (instance.logger) {
    instance.logger[level](`Executing: ${methodName} ${params}`);
  } else {
    const className = instance.constructor.name;
    Logger[level](`Executing: ${params}`, `${className}#${methodName}`);
  }
}

function printResponse(level: string, instance: any, methodName: string, result?: any) {
  const returnedData = typeof result === 'object' && result != null ? `: ${JSON.stringify(result)}` : result;

  if (instance.logger) {
    instance.logger[level](`Return: ${returnedData}`);
  } else {
    const className = instance.constructor.name;
    Logger[level](`Returned: ${returnedData}`, `${className}#${methodName}`);
  }
}
