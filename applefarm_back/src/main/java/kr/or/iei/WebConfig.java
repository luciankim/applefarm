package kr.or.iei;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import kr.or.iei.util.LoginInterceptor;


@Configuration
public class WebConfig implements WebMvcConfigurer{
	
	@Autowired
	private LoginInterceptor loginInterceptor;
	
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(loginInterceptor)
				.addPathPatterns("/member/**","/product/**","/trade/**", "/adming/**")
				.excludePathPatterns("/member/login","/member/join" ,"/member/sendEmail/*", "/member/email/*" ,"/member/id/*","/member/nickName/*","/member/sendCode/*","/member/findId","/member/sendEmail","/member/resetPw")
				.excludePathPatterns("/product/quality/*","/product/category","/product/detail/*","/product/img/*");

	}

	//암호화
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	} 
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addCorsMappings(registry);
	}

	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/board/editor/**")
		.addResourceLocations("file:///C:/Temp/applefarm/boardEditor/");
		registry.addResourceHandler("/board/thumbnail/**")
		.addResourceLocations("file:///C:/Temp/applefarm/board/");
		
		registry.addResourceHandler("/product/img/**")
		.addResourceLocations("file:///C:/Temp/applefarm/product/");
	}

	

}
