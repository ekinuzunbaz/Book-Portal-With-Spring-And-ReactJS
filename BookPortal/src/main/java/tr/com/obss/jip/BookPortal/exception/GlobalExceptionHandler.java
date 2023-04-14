package tr.com.obss.jip.BookPortal.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.NoSuchElementException;

@ControllerAdvice // bu sınıf controller seviyesinde attığım exceptionları yakalamak için var
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ArithmeticException.class) // en tepede throwable class'ı vardır
    public ResponseEntity<?> handleArithmeticException(HttpServletRequest request, Throwable t) {
        LOGGER.error(t.getMessage(), t); // loglarken bütün bilgiyi alıyorum
        var map = new HashMap<>();
        map.put("error", "Arithmetic error occured");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR); // ama kullanıcıya bir kısmını gösteriyorum sadece
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleUniqueException(HttpServletRequest request, DataIntegrityViolationException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", "Duplicate record found");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleUniqueException(HttpServletRequest request, NoSuchElementException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", "No record found. Update failed");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleUniqueException(HttpServletRequest request, IllegalArgumentException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", "No record found.");
        return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(HttpServletRequest request, MethodArgumentNotValidException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleRunTimeException(HttpServletRequest request, AccessDeniedException t) {
        LOGGER.error(t.getMessage(), t); // loglarken bütün bilgiyi alıyorum
        var map = new HashMap<>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFoundException(HttpServletRequest request, UsernameNotFoundException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<?> handleDisabledException(HttpServletRequest request, DisabledException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", "User is disabled");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(HttpServletRequest request, BadCredentialsException t) {
        LOGGER.error(t.getMessage(), t);
        var map = new HashMap<>();
        map.put("error", "Invalid credentials");
        return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleRunTimeException(HttpServletRequest request, Throwable t) {
        LOGGER.error(t.getMessage(), t); // loglarken bütün bilgiyi alıyorum
        var map = new HashMap<>();
        map.put("error", "Unknown error occured");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR); // ama kullanıcıya bir kısmını gösteriyorum sadece
    }

}

