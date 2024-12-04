package backend.rest.controllers;

import backend.model.exceptions.IncorrectLoginException;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.exceptions.WarehouseAlreadyExistsException;
import backend.model.services.AdminService;
import backend.rest.common.ErrorsDto;
import backend.rest.dtos.CreateWarehouseParamsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    private final String WAREHOUSE_ALREADY_EXISTS_EXCEPTION_CODE = "project.exceptions.WarehouseAlreadyExistsException";

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private AdminService adminService;

    @ExceptionHandler(WarehouseAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ErrorsDto handleWarehouseAlreadyExistsException(WarehouseAlreadyExistsException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(WAREHOUSE_ALREADY_EXISTS_EXCEPTION_CODE, null,
                WAREHOUSE_ALREADY_EXISTS_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @PostMapping("/createWarehouse")
    private Long createWarehouse(@RequestAttribute Long userId, @RequestBody CreateWarehouseParamsDto paramsDto)
            throws PermissionException, InstanceNotFoundException, WarehouseAlreadyExistsException {

        return adminService.createWarehouse(userId, paramsDto.getName());

    }
}
