package tr.com.obss.jip.BookPortal.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BookUpdateDTO {
    @NotBlank
    @Size(max = 255, message = "Please enter a valid title")
    private String title;

    @NotBlank
    @Size(max = 255, message = "Please enter a valid type")
    private String type;

    /*
    @NotBlank
    @Size(max = 255, message = "Please enter a valid name")
    private String authorName;

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    */

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


}
