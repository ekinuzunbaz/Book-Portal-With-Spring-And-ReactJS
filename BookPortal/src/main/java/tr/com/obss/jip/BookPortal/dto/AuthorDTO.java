package tr.com.obss.jip.BookPortal.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AuthorDTO {

    @NotBlank
    @Size(max = 255, message = "Please enter a valid name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

