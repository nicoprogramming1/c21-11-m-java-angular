package com.no_country.demo.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Curso {
    private String curso;
    private List<Asignatura> asignaturas;
    private String detalle;
    private List<Alumno> alumnos;
}
