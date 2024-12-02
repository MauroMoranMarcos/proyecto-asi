package backend.rest.common;

import backend.model.exceptions.DuplicateInstanceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Locale;

@ControllerAdvice
public class CommonControllerAdvice {

    private final static String DUPLICATE_INSTANCE_EXCEPTION_CODE = "project.exceptions.DuplicateInstanceException";

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(DuplicateInstanceException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleDuplicateInstanceException(DuplicateInstanceException exception, Locale locale) {

        String nameMessage = messageSource.getMessage(exception.getName(), null, exception.getName(), locale);
        String errorMessage = messageSource.getMessage(DUPLICATE_INSTANCE_EXCEPTION_CODE,
                new Object[] {nameMessage, exception.getKey().toString()}, DUPLICATE_INSTANCE_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

}
