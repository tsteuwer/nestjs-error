import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotAcceptableException, UnsupportedMediaTypeException } from '@nestjs/common';
import { validString } from 'accesso-model-lib';
import { Observable } from 'rxjs';

export const JsonApiAcceptHeader = 'application/vnd.api+json';

@Injectable()
export class AcceptJsonApiGuard implements CanActivate {
	/**
	 * Throws an unsupported media type if the Accept header does not have `application/vnd.api+json`
	 * @param context The execution context
	 */
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const { headers } = context.switchToHttp().getRequest();
		const accept: string[] = (headers.accept ?? '')
			.split(';')
			.map((str) => str.trim())
			.filter(validString);

		// If we dont have any, bail
		if (!accept.length) {
			throw new BadRequestException();
		}

		// Othwerise, it must contain the json api media type with no media type parameters (anything after the `;` are considered parameters)
		if (accept[0] !== JsonApiAcceptHeader) {
			throw new UnsupportedMediaTypeException();
		} else if (accept.length > 1) {
			throw new NotAcceptableException();
		}

		return true;
	}
}