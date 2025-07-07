package vn.aims.BookSeller;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import vn.aims.BookSeller.DTO.request.UserCreationDTO;
import vn.aims.BookSeller.Service.UserService;

@Slf4j
@AutoConfigureMockMvc
@SpringBootTest
class BookSellerApplicationTests {
	@MockBean
	private UserService userService;
	private UserCreationDTO userCreationDTO;


	@Test
	void contextLoads() {
	}

}
