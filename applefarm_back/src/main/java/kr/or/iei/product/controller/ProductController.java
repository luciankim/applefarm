package kr.or.iei.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.product.model.service.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/product")
@Tag(name="PRODUCT", description = "PRODUCT API")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	

}
