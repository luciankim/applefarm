package kr.or.iei;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
	
	//Swagger 확인은 아래 주소에서.
	//http://로컬주소:포트번호/swagger-ui/index.html
	
	private ApiInfo swaggerInfo() {
		return new ApiInfoBuilder()
					.title("APPLEFARM API")
					.description("APPLEFARM Api 문서")
					.build();
	}
	
	@Bean
	public Docket swaggerApi() {
		return new Docket(DocumentationType.SWAGGER_2)
					.consumes(getConsumeContentType())
					.produces(getProduceContentType())
					.apiInfo(swaggerInfo()).select()
					.apis(RequestHandlerSelectors.basePackage("kr.or.iei"))
					.paths(PathSelectors.any())
					.build()
					.useDefaultResponseMessages(false);
	}
	
	private Set<String> getConsumeContentType(){
		Set<String> consumes = new HashSet<String>();
		consumes.add("application/json;charset=UTF-8");
		consumes.add("application/x-www-form-urlencoded");
		return consumes;
	}
	
	private Set<String> getProduceContentType(){
		Set<String> produces = new HashSet<String>();
		produces.add("application/json;charset=UTF-8");
		produces.add("plain/text;charset=UTF-8");
		return produces;
	}
}




